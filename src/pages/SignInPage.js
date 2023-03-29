import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const SignInPage = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required("Please enter your password"),
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErroes = Object.values(errors);

    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleSignIn = async (values) => {
    if (!isValid) return;

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error) toast.error("It seems your password was wrong");
    }
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account pb-6 text-sm">
          You have not had an account?{" "}
          <NavLink  to={"/sign-up"}>Register an account</NavLink>{" "}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] mx-auto hover:bg-cyan-700 hover:text-white transition-all duration-300"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          height="50px"
          kind="green"
        >
          Login
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
