import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAccountContext } from "@/hooks/useAccount";
import Layout from "@/layouts/Main";
import { url } from "@/router";
import { User } from "@/interfaces/user";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";
import { en } from "@/lib/languages/en";
import { account } from "@/lib/schemas/account";

const formSchema = z.object({
  firstName: z
    .string({ message: en.firstName.string })
    .min(account.FIRST_NAME_MIN, { message: en.firstName.min })
    .max(account.FIRST_NAME_MAX, { message: en.firstName.max })
    .regex(/[a-zA-Z]/, { message: en.firstName.regex }),
  lastName: z
    .string({ message: en.lastName.string })
    .min(account.LAST_NAME_MIN, { message: en.lastName.min })
    .max(account.LAST_NAME_MAX, { message: en.lastName.max })
    .regex(/[a-zA-Z]/, { message: en.lastName.regex }),
  email: z
    .string({ required_error: en.email.string })
    .min(1, { message: en.email.string })
    .max(account.EMAIL_MAX, { message: en.email.max })
    .email({ message: en.email.email }),
});

export default function Profile() {
  const { getMe, editMe, isAuthenticated } = useAccountContext();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const params = useParams<{ uuid: string }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const cld = new Cloudinary({
    cloud: { cloudName: "dif3tn58q" },
  });

  const img = cld
    .image(user?.uuid || "")
    .format("auto")
    .quality("auto:best")
    .resize(fill().width(120).height(120))
    .roundCorners(max())
    .addAction("dpr_auto");

  useEffect(() => {
    const fetchMe = async () => {
      if (params.uuid && isAuthenticated) {
        try {
          const user = await getMe({ uuid: params.uuid });
          if (user) {
            setUser(user);
            form.reset({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          navigate(url.home);
        }
      }
    };
    fetchMe();
  }, [params.uuid, getMe, navigate, form, isAuthenticated]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedUser = await editMe(values);
    if (updatedUser) {
      setUser(updatedUser);
    }
  }

  return (
    <Layout>
      <main className="flex items-center gap-5">
        {!user ? (
          <div className="mt-4">
            <ProfileSkeleton />
          </div>
        ) : (
          <>
            <section>
              <AdvancedImage
                cldImg={img}
                plugins={[lazyload(), placeholder()]}
              />
            </section>
            <section className="flex flex-col justify-start gap-3">
              <article className="space-y-[-2px]">
                <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
                <p>{user?.email}</p>
              </article>
              <article>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Edit profile</Button>
                  </SheetTrigger>
                  <SheetContent className="flex flex-col gap-3 overflow-y-auto md:max-h-screen lg:max-h-screen">
                    <SheetHeader className="space-y-[-10px]">
                      <SheetTitle>
                        <h2>Edit profile</h2>
                      </SheetTitle>
                      <SheetDescription>
                        Make changes to your profile and save them when you're
                        done.
                      </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5 w-[95%]"
                      >
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">
                                First name
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Sarah" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">
                                Last name
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Thomas" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="example@email.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Save</Button>
                          </SheetClose>
                        </SheetFooter>
                      </form>
                    </Form>
                  </SheetContent>
                </Sheet>
              </article>
            </section>
          </>
        )}
      </main>
    </Layout>
  );
}
