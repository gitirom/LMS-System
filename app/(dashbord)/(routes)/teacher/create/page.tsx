"use client"
import * as z from "zod";
import axios from "axios";
import {zodResolver } from "@hookform/resolvers/zod";
import {useForm } from "react-hook-form";
import{
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
}
from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

//crate the form schema
const formSchema = z.object({
    title: z.string().min(1, {
        message: "Tistle is required",
    }),
});


const CreatePage = () => {
    const router = useRouter();
    //define the form using useFom
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const {isSubmitting, isValid} = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/course", values);
            router.push(`/teacher/courses/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 "> {/*mx-auto to make it center when width is changed */}
            <div className="">
                <h1 className="text-2xl">
                    Name Your Course
                </h1>
                <p className="text-sm text-slate-600 ">
                    What would you like to name your course? Don&apos;t
                    worry, you can change this later.
                </p>
                <Form {...form} >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'advenced web development'"
                                            {...field} //in the place of using onChange and all controle property
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What Will You Teach In Thins Course
                                    </FormDescription>
                                    <FormMessage /> {/*this will display any Error M.*/}
                                    <div className="flex items-center gap-x-2 ">
                                        <Link href="/" >
                                            <Button  type="button" variant="ghost" >
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" 
                                            disabled={!isValid || isSubmitting}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;