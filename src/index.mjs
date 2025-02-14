export default {
	async fetch(request, env, ctx) {
		console.log('entrou aqui caralhooo');
		const country = request.headers.get('cf-ipcountry') || 'Unknown';
		const userAgent = request.headers.get('user-agent') || 'Unknown';

		// Gerar um fingerprint simples baseado no User-Agent
		const fingerprint = generateFingerprint(userAgent);

		try {
			// Inserir dados no banco D1
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
