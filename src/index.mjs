export default {
	async fetch(request, env, ctx) {
		console.log('entrou aqui');
		const country = request.headers.get('cf-ipcountry') || 'Unknown';
		const userAgent = request.headers.get('user-agent') || 'Unknown';

		const fingerprint = generateFingerprint(userAgent);

		try {
			await env.DB.prepare(`INSERT INTO acessos (pais, fingerprint) VALUES (?, ?)`).bind(country, fingerprint).run();

			return new Response('Dados salvos com sucesso!', { status: 200 });
		} catch (error) {
			return new Response('Erro ao salvar dados: ' + error.message, { status: 500 });
		}
	},
};

function generateFingerprint(userAgent) {
	return btoa(unescape(encodeURIComponent(userAgent)));
}
