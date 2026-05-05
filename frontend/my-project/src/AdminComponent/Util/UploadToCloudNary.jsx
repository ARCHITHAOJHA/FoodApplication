const upload_preset = "ojha_food"
const cloud_name = "dlhhxfggd"
const api_url = "here cloud nary api url"


export const uploadImageToCloudinary = asyns(file) => {

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(api_url, {
        method: "post",
        body: data
    });

    const fileData = await res.json();
    console.log(fileData);
    return fileData.url;

}