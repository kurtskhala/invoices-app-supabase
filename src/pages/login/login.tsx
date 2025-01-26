import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useLogin } from '@/hooks/auth/useLogin';
import { AuthCredentials } from '@/types/auth';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const lang = params.lang as string;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: handleLogin, isPending } = useLogin();
  
  const onSubmit = (fieldValues: AuthCredentials) => {    
    handleLogin(fieldValues);
  };


  return (
    <Card>
      <CardHeader className="space-y-2 mb-2">
        <CardTitle className="text-center text-2xl">{t("auth-page.register.title-login")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'email-required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'email-invalid',
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
                    outline: 'none',
                    boxShadow: 'none',
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
            required: 'password-required',
            minLength: {
              value: 6,
              message: 'password-min-length 6',
            },
            maxLength: {
              value: 50,
              message: 'password-max-length 50',
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
                    outline: 'none',
                    boxShadow: 'none',
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
        >
          {isPending ? t("auth-page.register.loginingButton") : t("auth-page.register.loginButton")}
        </Button>
      </form>
      <div className="flex flex-col items-center pt-5">
        <p>{t("auth-page.register.dontAccount")}</p>
        <Button variant="ghost" onClick={() => navigate(`/${lang}/signup`)}>
        {t("auth-page.register.title-register")}
        </Button>
      </div>
    </Card>
  );
};

export default Login;
