import { createSlice } from "@reduxjs/toolkit";

const createFolder = (
  name,
  children = [],
  created = new Date().toISOString(),
  size = 0
) => ({
  name,
  children,
  created,
  size,
  type: children.length > 0 ? "folder" : "file",
});

const initialState = {
  selectedItem: "Recents",
  items: ["Recents", "Applications", "Documents", "Desktop", "Downloads"],
  folders: {
    Recents: [
      createFolder("Recent File 1", [], "2023-09-01T10:00:00Z", 1024),
      createFolder(
        "Recent Folder",
        [
          createFolder(
            "Subfolder 1",
            [createFolder("Document 1.txt", [], "2023-09-05T14:30:00Z", 2048)],
            "2023-09-05T14:00:00Z",
            2048
          ),
        ],
        "2023-09-05T13:00:00Z",
        2048
      ),
    ],
    Applications: [
      createFolder("App 1", [], "2023-01-01T00:00:00Z", 1000000),
      createFolder("App 2", [], "2023-02-15T12:30:00Z", 2000000),
      createFolder(
        "Utilities",
        [
          createFolder("Utility 1", [], "2023-03-10T09:15:00Z", 500000),
          createFolder("Utility 2", [], "2023-03-11T11:45:00Z", 750000),
        ],
        "2023-03-01T08:00:00Z",
        1250000
      ),
    ],
    Documents: [
      createFolder(
        "Work",
        [
          createFolder(
            "Project A",
            [
              createFolder("Report.docx", [], "2023-08-15T16:20:00Z", 5120),
              createFolder("Data.xlsx", [], "2023-08-16T10:45:00Z", 8192),
            ],
            "2023-08-15T15:00:00Z",
            13312
          ),
          createFolder("Project B", [], "2023-09-01T09:00:00Z", 0),
        ],
        "2023-08-01T08:00:00Z",
        13312
      ),
      createFolder(
        "Personal",
        [
          createFolder("Resume.pdf", [], "2023-07-20T14:30:00Z", 1024),
          createFolder("Budget.xlsx", [], "2023-08-05T18:15:00Z", 4096),
        ],
        "2023-07-01T10:00:00Z",
        5120
      ),
    ],
    Desktop: [
      createFolder(
        "Screenshot 2023-09-10.png",
        [],
        "2023-09-10T15:30:00Z",
        2048
      ),
      createFolder(
        "Untitled Folder",
        [
          createFolder(
            "New Text Document.txt",
            [],
            "2023-09-11T09:45:00Z",
            256
          ),
        ],
        "2023-09-11T09:40:00Z",
        256
      ),
    ],
    Downloads: [
      createFolder("installer.exe", [], "2023-09-08T11:20:00Z", 10485760),
      createFolder("report-draft.docx", [], "2023-09-09T16:40:00Z", 4096),
      createFolder(
        "vacation-photos",
        [
          createFolder("photo1.jpg", [], "2023-09-07T20:15:00Z", 3072),
          createFolder("photo2.jpg", [], "2023-09-07T20:16:00Z", 2048),
          createFolder("photo3.jpg", [], "2023-09-07T20:17:00Z", 4096),
        ],
        "2023-09-07T20:10:00Z",
        9216
      ),
    ],
  },
};

const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    addFolder: (state, action) => {
      const { path, folder } = action.payload;
      let current = state.folders;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]].children;
      }
      current.push(
        createFolder(folder.name, folder.children, folder.created, folder.size)
      );
    },
    removeFolder: (state, action) => {
      const { path } = action.payload;
      let current = state.folders;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]].children;
      }
      const index = current.findIndex((f) => f.name === path[path.length - 1]);
      if (index !== -1) {
        current.splice(index, 1);
      }
    },
    updateFolder: (state, action) => {
      const { path, updates } = action.payload;
      let current = state.folders;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]].children;
      }
      const folder = current.find((f) => f.name === path[path.length - 1]);
      if (folder) {
        Object.assign(folder, updates);
      }
    },
  },
});

export const { setSelectedItem, addFolder, removeFolder, updateFolder } =
  finderSlice.actions;

export default finderSlice.reducer;
