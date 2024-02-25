const Loading = () => {
  return (
    <div
      className="h-screen flex justify-center items-center"
      aria-label="読み込み中"
    >
      <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent"></div>
      <div className="hidden"></div>
    </div>
  )
}

export default Loading
