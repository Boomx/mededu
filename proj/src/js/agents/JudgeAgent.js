import _ from 'lodash'
class JudgeAgent {
    static get $inject(){ return ['StateManagerAgent']};
    stateAgent = {};
    constructor(stateManagerAgent){
        this.stateAgent = stateManagerAgent;
    };
    judge(questions) {
        if(this.stateAgent.isLeveling){
            const level = this.judgeLeveling(questions);
            if(level > this.stateAgent.getMaxLevel())
                this.stateAgent.setMaxLevel(level);    
            this.stateAgent.announce(`Parabéns, você conquistou o nivel ${level}`)
        } else {
            const result = this.judgeLevel(questions);
            console.log('result', result);
            if(result == 'success' && this.stateAgent.currentLevel + 1 > this.stateAgent.getMaxLevel()){
                this.stateAgent.setMaxLevel(this.stateAgent.currentLevel + 1);
                if(this.stateAgent.currentLevel == 1)
                    this.stateAgent.announce(`Parabéns, você terminou o nivel ${this.stateAgent.currentLevel}. Você acaba de ganhar uma mesa de Notebook.`)
                if(this.stateAgent.currentLevel == 2)
                    this.stateAgent.announce(`Parabéns, você terminou o nivel ${this.stateAgent.currentLevel}. Você acaba de ganhar um Notebook.`)
                if(this.stateAgent.currentLevel == 3)
                    this.stateAgent.announce(`Parabéns, você terminou o nivel ${this.stateAgent.currentLevel}. Você acaba de ganhar uma Estante.`)
                if(this.stateAgent.currentLevel == 4)
                    this.stateAgent.announce(`Parabéns, você terminou o nivel ${this.stateAgent.currentLevel}. Você acaba de ganhar uma Balança.`)
                if(this.stateAgent.currentLevel == 5)
                    this.stateAgent.announce(`Parabéns, você terminou o nivel ${this.stateAgent.currentLevel}. Você acaba de ganhar uma Maca Clinica.`)
                }
            else if(result == 'fail')
                this.stateAgent.announce(`Você precisa fazer um reforço`, () => this.stateAgent.toReinforcement())
            else this.stateAgent.announce(`Parabéns, você terminou o nivel ${this.stateAgent.currentLevel}`)
        }
    }
    judgeLeveling(questions){
        const allLevel1 = questions.filter(q => q.level == 1 && q.correctlyAnswered).length == 2;
        const allLevel2 = questions.filter(q => q.level == 2 && q.correctlyAnswered).length == 2;
        const allLevel3 = questions.filter(q => q.level == 3 && q.correctlyAnswered).length == 2;
        const allLevel4 = questions.filter(q => q.level == 4 && q.correctlyAnswered).length == 2;
        if(allLevel1 && allLevel2 && allLevel3 && allLevel4) return 5;
        if(allLevel1 && allLevel2 && allLevel3) return 4;
        if(allLevel1 && allLevel2) return 3;
        if(allLevel1) return 2;
        return 1;
    }
    
    judgeLevel(questions){
        const correctAnswered = questions.filter(q => q.correctlyAnswered).length;
        if(correctAnswered <= 4) return 'fail';
        if(correctAnswered >= 6) return 'success';
        return 'ok';
    }
}

export default () => angular.module('med-edu').service('JudgeAgent', JudgeAgent)