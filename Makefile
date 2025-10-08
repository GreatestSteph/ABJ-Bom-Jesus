start:
	@echo "🚀 Iniciando Frontend e Backend..."
	@echo "📱 Frontend: http://localhost:3000"
	@echo "🔧 Backend: http://localhost:3001"
	@echo ""
	@echo "Pressione Ctrl+C para parar ambos os serviços"
	@echo ""
	@trap 'kill %1 %2 2>/dev/null || true' INT; \
	cd frontend && npm start & \
	cd backend && npm run dev & \
	wait
