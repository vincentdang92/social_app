import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { createUserAccount, getCurrentUser } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignUpAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SignupForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();


  const {mutateAsync: createUserAccount, isLoading: isCreatingUser} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isLoading: isSigning} = useSignUpAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: ""
      
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // const test = await getCurrentUser();
    // console.log(test);
    // return;
    const newUser = await createUserAccount(values);
    if(!newUser){
      return toast({
        title: "Can't create User. Please try again!"
        
      })
    }
    const session = await signInAccount({email: values.email, password: values.password});
    if(!session){
      return toast({
        title: "Can't create Session. Please try again!"
        
      })
    }
    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset();
      navigate('/');
    }
    else{
      return toast({
        title: "Signin false. Please try again!"
        
      })
    }

    console.log(newUser);
  }
  return (
    
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="">Create Account</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn-primary flex-center gap-2">
          {isCreatingUser ? 
            (
              <div className="flex-center gap-2">
                <Loader />  Loading...
              </div>
            )
            : "Submit"  
          }
        </Button>
        <p className="text-small-regular">Have an account? 
          <Link to="/sign-in" className="text-primary-500 ml-1">Sign In</Link>
        </p>
      </form>
      </div>

      
    </Form>
  )
}

export default SignupForm