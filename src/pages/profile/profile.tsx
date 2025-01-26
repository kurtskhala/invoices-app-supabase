import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";
import { getProfileInfo } from "@/supabase/profile";
import { useProfileUpdate } from "@/hooks/profile/useProfileUpdate";
import { ProfileFormData } from "@/types/profile";
import { useLogout } from "@/hooks/auth/useLogout";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrow from "@/assets/icon-arrow-left.svg";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const user = useAtomValue(userAtom);
  const { t } = useTranslation();
  const { mutate: handleLogout } = useLogout();
  const navigate = useNavigate();
  const params = useParams();
  const lang = params.lang as string;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name_en: "",
      last_name_en: "",
      first_name_ka: "",
      last_name_ka: "",
    },
  });

  useEffect(() => {
    if (user) {
      console.log(user);

      getProfileInfo(user.user.id).then((profileData) => {
        console.log(profileData);

        reset({
          first_name_en: profileData.first_name_en ?? undefined,
          last_name_en: profileData.last_name_en ?? undefined,
          first_name_ka: profileData.first_name_ka ?? undefined,
          last_name_ka: profileData.last_name_ka ?? undefined,
        });
      });
    }
  }, [user, reset]);

  const { mutate: handleFillProfileInfo, isPending } = useProfileUpdate();

  const onSubmit = (fieldValues: ProfileFormData) => {
    handleFillProfileInfo({
      ...fieldValues,
      id: user?.user?.id,
    });
  };

  const handleGoBack = () => {
    navigate(`/${lang}/invoices`);
  };

  return (
    <Card>
      <Button variant="link" onClick={handleGoBack} className="pl-0">
        <img src={LeftArrow} alt="left arrow" />
        <p className="pt-1">{t("profile-page.go-back")}</p>
      </Button>
      <CardHeader className="space-y-2 mb-2">
        <CardTitle className="text-center text-2xl dark:text-white">
          {t("profile-page.profile")}
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
                    <Label>{t("profile-page.first_name_en")}</Label>
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
                    <Label>{t("profile-page.last_name_en")}</Label>
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
                    <Label>{t("profile-page.first_name_ka")}</Label>
                    <Input
                      type="text"
                      name="first_name_ka"
                      placeholder="John"
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
                    <Label>{t("profile-page.last_name_ka")}</Label>
                    <Input
                      type="text"
                      name="last_name_ka"
                      placeholder="Doe"
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

        <Button
          type="submit"
          variant="default"
          className="w-full bg-primary-purple hover:bg-dark-purple"
          disabled={isPending}
        >
          {isPending
            ? t("profile-page.updating-button")
            : t("profile-page.update-button")}
        </Button>
        <Button onClick={() => handleLogout()}>
          {t("profile-page.logout-button")}
        </Button>
      </form>
    </Card>
  );
};

export default Profile;
