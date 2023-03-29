import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import Layout from "components/layout/Layout";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const { userInfo } = useAuth();

  const userId = userInfo?.uid;

  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  const handleUpdateUserInfo = async (values) => {
    if (!isValid) return;

    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });

      toast.success("Update profile information successfully!");
    } catch (error) {
      toast.error("Update profile failed!");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);

    await updateDoc(colRef, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    (async function () {
      if (!userId) return;

      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);

      reset(docData && docData.data());
    })();
  }, [userId, reset]);

  return (
    <Layout>
      <div className="pt-[150px] pb-[100px] ">
        <div className="container ">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold">Account information</h1>
            <p className="">Update your account information</p>
          </div>

          <form onSubmit={handleSubmit(handleUpdateUserInfo)}>
            <div className="mb-10 text-center">
              <ImageUpload
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                progress={progress}
                image={image}
                className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
              ></ImageUpload>
            </div>

            <div className="form-layout">
              <Field>
                <Label>Email</Label>
                <Input
                  control={control}
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                ></Input>
              </Field>

              <Field></Field>
            </div>

            <div className="form-layout">
              <Field>
                <Label>Fullname</Label>
                <Input
                  control={control}
                  name="fullname"
                  placeholder="Enter your fullname"
                ></Input>
              </Field>

              <Field>
                <Label>Username</Label>
                <Input
                  control={control}
                  name="username"
                  placeholder="Enter your username"
                ></Input>
              </Field>
            </div>

            {/* <div className="form-layout">
              <Field>
                <Label>Date of Birth</Label>
                <Input
                  control={control}
                  name="birthday"
                  placeholder="dd/mm/yyyy"
                ></Input>
              </Field>

              <Field>
                <Label>Mobile Number</Label>
                <Input
                  control={control}
                  name="phone"
                  placeholder="Enter your phone number"
                ></Input>
              </Field>
            </div> */}

            <div className="form-layout">
              <Field>
                <Label>New Password</Label>
                <InputPasswordToggle
                  control={control}
                  placeholder="Enter your password"
                ></InputPasswordToggle>
              </Field>

              <Field>
                <Label>Confirm Password</Label>
                <InputPasswordToggle
                  control={control}
                  placeholder="Enter your confirm password"
                ></InputPasswordToggle>
              </Field>
            </div>

            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              kind="green"
              height="50px"
              className="mx-auto w-[200px]"
              type="submit"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
