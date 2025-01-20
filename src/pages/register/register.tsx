import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RegisterCredentials } from "@/types/auth";
import { useRegister } from "@/hooks/auth/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { mutate: handleRegister, isPending } = useRegister();

  const onSubmit = (fieldValues: RegisterCredentials) => {
    handleRegister(fieldValues);
  };

  return (
    <Card>
      <CardHeader className="space-y-2 mb-2">
        <CardTitle className="text-center text-2xl dark:text-white">
          Register
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "name-required",
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "name-invalid",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <div>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={value}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </>
              );
            }}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "lastname-required",
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "lastname-invalid",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={value}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </>
              );
            }}
          />
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "email-required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "email-invalid",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            console.log(error);
            return (
              <>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={value}
                  onChange={onChange}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "password-required",
            minLength: {
              value: 6,
              message: "password-min-length 6",
            },
            maxLength: {
              value: 50,
              message: "password-max-length 50",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            console.log(error);
            return (
              <>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={value}
                  onChange={onChange}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </>
            );
          }}
        />
        <Button
          type="submit"
          variant="default"
          className="w-full bg-primary-purple hover:bg-dark-purple"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Register"}
        </Button>
      </form>
      <div className="flex flex-col items-center pt-5">
        <p>Do you already have an account?</p>
        <Button variant="ghost" onClick={() => navigate("/signin")}>
          Log In
        </Button>
      </div>
    </Card>
  );
};

export default Register;
