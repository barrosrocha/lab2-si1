angular.module("toDoList").controller("toDoListCrtl", function($scope){
	
	var self = this;
	self.porcentagem = 0;

	self.cabecalho = "To do List !"
	self.tarefas = [
		{nome: "Estudar para Provas da Universidade."},
		{nome: "Fazer atividade fisica."},
		{nome: "Lavar a louça."}
	];
	self.adicionarTarefa = function (tarefa){
		self.tarefas.push(angular.copy(tarefa));
		delete $scope.tarefa;
		$scope.tarefaForm.$setPristine();
		self.calcularPorcentagem();
	};
	self.apagarTarefas = function (tarefas) {
		self.tarefas = self.tarefas.filter(function (tarefa){
			if(!tarefa.removida) return tarefa;
		});
		self.calcularPorcentagem();
	};
	self.limparTarefas = function (){
		self.tarefas = [];
		self.calcularPorcentagem();
	};
	self.isTarefaRemovida = function( tarefas ){
		return self.tarefas.some(function (tarefa){
			return tarefa.removida;
		});
	};
	self.getPorcentagem = function() {
		return (self.porcentagem).toPrecision(3);
	};
	self.calcularPorcentagem = function(){
	
		var concluidas = 0;

		self.tarefas.forEach(function(tarefa){
			if(tarefa.concluida){
				concluidas += 1;	
			} 
		});

		if(concluidas == 0){
			self.porcentagem = 0;
		}
		else{
			self.porcentagem = ((concluidas  * 100) / self.tarefas.length);
		}
		document.getElementById("barraProgresso").value = self.porcentagem;
		return self.porcentagem;
	};
	self.removerTarefa = function(tarefa){
		var posicao = self.tarefas.indexOf(tarefa);
		self.tarefas.splice(posicao, 1);
		self.calcularPorcentagem();
	}
});