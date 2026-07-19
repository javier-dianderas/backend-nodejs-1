// const validate = (schema, property = "body") => {
//     return (req, res, next) => {
//         const result = schema.safeParse(req[property]);
//         console.log(result);
//         if(!result.success) {
//             return res.status(400).json({
//                 success: false,
//                 errors: result.error.issues
//             });
//         }
//         next();
//     };
// };

export const validate = (schema, property) => (req, res, next) => {

    const result = schema.safeParse(req[property]);

    if (!result.success) {
        return res.status(400).json({
            status: "error",
            errors: result.error.flatten()
        });
    }

    next();
};