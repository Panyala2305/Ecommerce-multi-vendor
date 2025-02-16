export default function responseReture(res,code,data) {
    return res.status(code).json(data)
}