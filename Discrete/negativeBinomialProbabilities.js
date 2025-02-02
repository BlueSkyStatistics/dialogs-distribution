





class negativeBinomialProbabilities extends baseModal {
    static dialogId = 'negativeBinomialProbabilities'
    static t = baseModal.makeT(negativeBinomialProbabilities.dialogId)

    constructor() {
        var config = {
            id: negativeBinomialProbabilities.dialogId,
            label: negativeBinomialProbabilities.t('title'),
            modalType: "one",
            RCode: `
                local(
                    {
                       .Table <- data.frame(Probability=stats::dnbinom(0:10, size={{selected.size | safe}}, prob={{selected.prob | safe}}))
                        rownames(.Table) <- (0:10)
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Negative Binomial Probabilities")
                    }
                    )                
                `
        }
        var objects = {
            size: {
                el: new input(config, {
                    no: 'size',
                    label: negativeBinomialProbabilities.t('size'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: negativeBinomialProbabilities.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            }
        }
        const content = {
            items: [objects.size.el.content, objects.prob.el.content],
            nav: {
                name: negativeBinomialProbabilities.t('navigation'),
                icon: "icon-negtive-binary-code-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: negativeBinomialProbabilities.t('help.title'),
            r_help: negativeBinomialProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: negativeBinomialProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new negativeBinomialProbabilities().render()
}
