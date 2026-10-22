import { icon } from "../components/icon";
import { bootPage } from "../components/layout";
import { roleIcon } from "../components/marks";
import { toast } from "../components/toast";
import { getRole, ROLES } from "../data/roles";
import { submitRegistration } from "../lib/api";
import { html, qs, render } from "../lib/html";
import type { Registration, RoleId } from "../lib/types";

type FieldName = Exclude<keyof Registration, "role">;
type Control = HTMLInputElement | HTMLTextAreaElement;

/** Each rule returns an error message, or null when the value is valid. */
const RULES: Record<FieldName, (value: string) => string | null> = {
  name: (v) => (v ? null : "Enter your full name."),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Enter an email address like name@example.com."),
  whatsapp: (v) => (v.replace(/\D/g, "").length >= 10 ? null : "Enter a WhatsApp number with at least 10 digits."),
  portfolio: (v) => (!v || /^https?:\/\/\S+\.\S+/.test(v) ? null : "Start the link with https://"),
  experience: (v) => (v ? null : "Tell us what you've done so far."),
  contribution: (v) => (v ? null : "Tell us what you'll bring to your team."),
};

function setFieldError(control: Control, message: string | null): void {
  const field = control.closest(".field")!;
  field.classList.toggle("has-error", !!message);
  field.querySelector(".error")?.remove();
  control.removeAttribute("aria-invalid");
  if (!message) return;
  const id = `${control.id}-error`;
  field.insertAdjacentHTML("beforeend", html`<p class="error" id="${id}">${message}</p>`.toString());
  control.setAttribute("aria-invalid", "true");
  control.setAttribute("aria-errormessage", id);
}

const successView = (entry: Registration) => {
  const role = getRole(entry.role);
  return html`
    <div class="register__done" role="status">
      ${roleIcon(role, "xl")}
      <h2 class="h2">You're registered, ${entry.name.split(" ")[0]}.</h2>
      <p class="lede">You've joined as ${role.name}. We'll message you on WhatsApp when your team is formed.</p>
      <a class="btn btn--ghost" href="teams.html">Explore teams${icon("arrow-right")}</a>
    </div>`;
};

bootPage("register", () => {
  render(
    qs("[data-role-pick]"),
    html`${ROLES.map(
      (r) => html`
        <div class="role-pick__option" style="--c:${r.color}">
          <input type="radio" name="role" id="r-${r.id}" value="${r.id}">
          <label for="r-${r.id}">${roleIcon(r, "sm")}<span>${r.name}</span>${icon("check", "role-pick__check")}</label>
        </div>`,
    )}`,
  );

  const form = qs<HTMLFormElement>("[data-register-form]");
  const roleError = qs("[data-role-error]");
  const control = (name: FieldName) => form.elements.namedItem(name) as Control;

  // Clear an error as soon as the user fixes it.
  form.addEventListener("input", (e) => {
    const target = e.target as Control;
    if (target.name === "role") roleError.hidden = true;
    else if (target.closest(".has-error")) setFieldError(target, RULES[target.name as FieldName](target.value.trim()));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstInvalid: HTMLElement | null = null;

    const roleInput = form.querySelector<HTMLInputElement>("input[name=role]:checked");
    roleError.hidden = !!roleInput;
    if (!roleInput) firstInvalid = form.querySelector("input[name=role]");

    for (const name of Object.keys(RULES) as FieldName[]) {
      const el = control(name);
      const message = RULES[name](el.value.trim());
      setFieldError(el, message);
      if (message) firstInvalid ??= el;
    }
    if (firstInvalid || !roleInput) {
      firstInvalid?.focus();
      return;
    }

    const value = (name: FieldName) => control(name).value.trim();
    const entry: Registration = {
      role: roleInput.value as RoleId,
      name: value("name"),
      email: value("email"),
      whatsapp: value("whatsapp"),
      portfolio: value("portfolio"),
      experience: value("experience"),
      contribution: value("contribution"),
    };

    const submit = qs<HTMLButtonElement>("[type=submit]", form);
    submit.disabled = true;
    try {
      await submitRegistration(entry);
    } catch (error) {
      console.error("Unable to save registration.", error);
      submit.disabled = false;
      toast("Your registration could not be saved. Please try again.");
      return;
    }
    render(qs("[data-register]"), successView(entry));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
