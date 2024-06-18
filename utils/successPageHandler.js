export const successPagefun = (req, res, successTitle, successMessage) => {
    res.status(200).render("success", {
        title: "Success",
        path: "/successPage",
        metaDescription: "success page",
        successTitle,
        successMessage
    });
};
