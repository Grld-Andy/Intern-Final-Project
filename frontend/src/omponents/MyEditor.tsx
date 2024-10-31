import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './myEditor.css'

interface Props {
    content: string|undefined;
    setContent: (value: string) => void;
}

const MyEditor: React.FC<Props> = ({ content, setContent }) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-[#344054] font-medium text-[14px] leading-[20px]">Linked Docs</h1>
            <div className="bg-white h-[169px] border border-[#d0d5dd] rounded-lg shadow px-[14px] py-[10px]">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'link', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }],
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default MyEditor;
