export const buildLink = (req, targetPage) => {
    const params = new URLSearchParams(req.query);

    params.set("page", targetPage);

    return `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}?${params.toString()}`;
};