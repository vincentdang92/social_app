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
import { SigninValidation, SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { createUserAccount, getCurrentUser } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignUpAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SigninForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const {mutateAsync: signInAccount, isPending: isSigning} = useSignUpAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: ""
      
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    console.log(values);
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
  }
  return (
    
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="">Login</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 gap-5 w-full mt-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
        
        
        <Button type="submit" className="btn-primary flex-center gap-2">
          {isSigning ? 
            (
              <div className="flex-center gap-2">
                <Loader />  Loading...
              </div>
            )
            : "Sign In"  
          }
        </Button>
        <p className="text-small-regular">Don't have account? 
          <Link to="/sign-up" className="text-primary-500 ml-1">Sign Up</Link>
        </p>
      </form>
      </div>

      
    </Form>
  )
}

export default SigninForm