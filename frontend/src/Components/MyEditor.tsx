import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './myEditor.css'

interface Props {
    content: string;
    setContent: (value: string) => void;
}

const MyEditor: React.FC<Props> = ({ content, setContent }) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-[#344054] font-medium text-[14px] leading-[20px]">Linked Docs</h1>
            <div className="bg-white h-[170px] border border-[#d0d5dd] rounded-lg shadow px-4 py-2 flex flex-col gap-2">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'image'],
                            ['clean'], // Remove formatting button
                        ],
                    }}
                    className="h-[110px] rounded-md" // Set height and round corners
                    style={{ outline: 'none', border: 'none', overflowY: 'scroll' }} // Remove outline
                />
            </div>
        </div>
    );
};

export default MyEditor;
