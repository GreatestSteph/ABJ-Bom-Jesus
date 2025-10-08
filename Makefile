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


start-docker:
	@echo "🚀 Iniciando Docker..."
	sudo systemctl start docker && \
	docker start mysql8

stop-docker:
	@echo "🛑 Parando Docker..."
	sudo systemctl stop docker && \
	docker stop mysql8
	

reset-database:
	@echo "🔄 Resetando banco de dados..."
	cd backend && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
