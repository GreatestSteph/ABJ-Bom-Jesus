create-database:
	npx babel-node src/persistencia/migrations/criarBanco.js

run-migrations:
	npx babel-node src/persistencia/migrations/criarTabelas.js

run-seeds:
	npx babel-node src/persistencia/seeds/criarSeeds.js

setup-database: create-database run-migrations run-seeds
