function Textarea({ ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className="resize-none outline-none w-full"
      {...props}
    />
  )
}

export { Textarea }
