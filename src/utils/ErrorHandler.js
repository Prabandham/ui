export const ErrorHandler = (error) => {
    return error.response.data.error.split(",").filter(e => String(e).trim()).join("\n");
}