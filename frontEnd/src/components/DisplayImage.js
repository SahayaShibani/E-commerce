import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgurl, onClose }) => {

    return (
        <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg max-w-5xl mx-auto p-4">
                <div className="w-fit ml-auto text-2xl close-btn" onClick={onClose}>
                    <IoMdClose />
                </div>
                <div className="flex justify-center p-4 max-w-[70vh] max-h-[80vh] ">
                    <img src={imgurl} height={400} width={400} />
                </div>
            </div>

        </div>

    )
}

export default DisplayImage