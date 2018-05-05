const fetchApiData = () => new Promise((success) => {
    setTimeout(() => {
        success({
            success: 'ok'
        });
    }, 1000);
});

export default fetchApiData;
