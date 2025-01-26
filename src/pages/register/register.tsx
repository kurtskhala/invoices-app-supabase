import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RegisterCredentials } from "@/types/auth";
import { useRegister } from "@/hooks/auth/useRegister";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const params = useParams();
  const lang = params.lang as string;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name_en: "",
      first_name_ka: "",
      last_name_en: "",
      last_name_ka: "",
      email: "",
      password: "",
    },
  });
  const { t } = useTranslation();

  const { mutate: handleRegister, isPending } = useRegister();

  const onSubmit = (fieldValues: RegisterCredentials) => {
    handleRegister(fieldValues);
  };

  return (
    <Card>
      <CardHeader className="space-y-2 mb-2">
        <CardTitle className="text-center text-2xl dark:text-white">
          {t("auth-page.register.title-register")}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4">
          <Controller
            name="first_name_en"
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
                    <Label>{t("auth-page.register.firstNameEn")}</Label>
                    <Input
                      type="text"
                      name="first_name_en"
                      placeholder="John"
                      value={value}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    {errors.first_name_en && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.first_name_en.message}
                      </p>
                    )}
                  </div>
                </>
              );
            }}
          />

          <Controller
            name="last_name_en"
            control={control}
            rules={{
              required: "last_name-required",
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "last_name-invalid",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <div>
                    <Label> {t("auth-page.register.lastNameEn")}</Label>
                    <Input
                      type="text"
                      name="last_name_en"
                      placeholder="Doe"
                      value={value}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    {errors.last_name_en && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.last_name_en.message}
                      </p>
                    )}
                  </div>
                </>
              );
            }}
          />
        </div>
        <div className="flex space-x-4">
          <Controller
            name="first_name_ka"
            control={control}
            rules={{
              required: "name-required",
              pattern: {
                value: /^[ა-ჰ0-9\s]+$/,
                message: "name-invalid",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <div>
                    <Label>{t("auth-page.register.firstNameKa")}</Label>
                    <Input
                      type="text"
                      name="first_name_ka"
                      placeholder="ჯონ"
                      value={value}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    {errors.first_name_ka && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.first_name_ka.message}
                      </p>
                    )}
                  </div>
                </>
              );
            }}
          />

          <Controller
            name="last_name_ka"
            control={control}
            rules={{
              required: "last_name-required",
              pattern: {
                value: /^[ა-ჰ0-9\s]+$/,
                message: "last_name-invalid",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <div>
                    <Label> {t("auth-page.register.lastNameKa")}</Label>
                    <Input
                      type="text"
                      name="last_name_ka"
                      placeholder="დოე"
                      value={value}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    {errors.last_name_ka && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.last_name_ka.message}
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
                <Label>{t("auth-page.register.email")}</Label>
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
                <Label>{t("auth-page.register.password")}</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder={t("auth-page.register.password")}
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
          {isPending
            ? t("auth-page.register.submiting")
            : t("auth-page.register.submit")}
        </Button>
      </form>
      <div className="flex flex-col items-center pt-5">
        <p>{t("auth-page.register.alreadyAccount")}</p>
        <Button variant="ghost" onClick={() => navigate(`/${lang}/signin`)}>
          {t("auth-page.register.loginButton")}
        </Button>
      </div>
    </Card>
  );
};

export default Register;
