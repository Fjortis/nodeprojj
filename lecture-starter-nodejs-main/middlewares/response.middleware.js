const responseMiddleware = (req, res, next) => {
    res.success = data => {
        res.status(200).json(data);
    };

    res.error = (message, statusCode = 400) => {
        res.status(statusCode).json({ error: true, message });
    };

    res.notFound = () => {
        res.status(404).json({ error: true, message: 'Resource not found' });
    };

    next();
};

export { responseMiddleware };
