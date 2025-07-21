import React from "react";

interface FileTreeViewProps {
    tree: any; // Will define proper type later
    side: "left" | "right";
}

const FileTreeView: React.FC<FileTreeViewProps> = ({ tree, side }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 border rounded p-4 min-h-[200px]">
            File Tree View ({side})
            {/* TODO: Render file/folder tree with highlights */}
        </div>
    );
};

export default FileTreeView; 