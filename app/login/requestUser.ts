"use server";
import logInSchema from "./form-input-schema";
import { ActionResult } from "./action-result";
import {
  formatError,
  getErrorsForForm,
  getErrorsForField,
} from "./format-error";

interface Body {
  username: string;
  password: string;
}

const logUserIn = async (
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;
  console.log(data)
  const result = await logInSchema.safeParseAsync(data);
  console.log("backend",result)
  if (!result.success) {
    let error = {
      errors: formatError(result.error),
    };
    console.log('backend', error)
    return error;
  }
  const { username, password } = data;
  const body: Body = {
    username,
    password,
  };
  let usableResponse;
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    usableResponse = await response.json();
  } catch (error) {
    return {
      errors: getErrorsForForm("An error ocured"),
    };
  }
  if (usableResponse.success) {
    if (usableResponse.user.role !== "writer") {
      let error = {
        errors: formatError("Not a writer, Apply Below!"),
      };
      return error;
    }
    return {
      success: true,
      user: usableResponse.user,
      token: usableResponse.token,
    };
  } else {
    let error = {
      errors: getErrorsForField(
        usableResponse.errors.path,
        usableResponse.errors.message
      ),
    };
    return error;
  }
};

export default logUserIn;
