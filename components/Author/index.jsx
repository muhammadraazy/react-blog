import Image from "next/image"

const Author = ({author}) => {
    return (
        <div className="bg-black mt-20 mb-8 text-center p-12 rounded-lg bg-opacity-25 relative">
          <div className="absolute inset-x-0 -top-14"> 
            <Image unoptimized alt={author.name} src={author.photo.url} className="align-middle rounded-full outline-white" height="100px" width="100px" />
          </div>
            <h1 className="text-white my-4 text-xl font-bold"> { author.name } 
            </h1>
            <p className="text-white text-lg"> { author.bio } </p>
        </div>
    )
}

export default Author
