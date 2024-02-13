export default function useLoggers(app) {
	app.use((req, res, next) => {
		console.log(req.method, req.url, req.body);
		next();
	});
}