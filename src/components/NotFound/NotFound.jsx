import notFound from "../../assets/404.jpg";

function NotFound() {
  return (
    <div className="container mx-auto mt-32">
      <img src={notFound} alt="not found image" className="w-full" />
    </div>
  );
}

export default NotFound;
