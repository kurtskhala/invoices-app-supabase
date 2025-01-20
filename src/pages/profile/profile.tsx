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

const Profile = () => {
  const user = useAtomValue(userAtom);
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (user) {
      getProfileInfo(user.user.id).then((profileData) => {
        reset({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
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

  return (
    <Card>
      <CardHeader className="space-y-2 mb-2">
        <CardTitle className="text-center text-2xl dark:text-white">
          Profile
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

        <Button
          type="submit"
          variant="default"
          className="w-full bg-primary-purple hover:bg-dark-purple"
          disabled={isPending}
        >
          {isPending ? "Upadting..." : "Update Profile"}
        </Button>
      </form>
    </Card>
  );
};

export default Profile;
