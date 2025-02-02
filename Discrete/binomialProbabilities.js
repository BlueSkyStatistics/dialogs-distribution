





class binomialProbabilities extends baseModal {
    static dialogId = 'binomialProbabilities'
    static t = baseModal.makeT(binomialProbabilities.dialogId)

    constructor() {
        var config = {
            id: binomialProbabilities.dialogId,
            label: binomialProbabilities.t('title'),
            modalType: "one",
            RCode: `
                local(
                    {
                       .Table <- data.frame(Probability=stats::dbinom(0:{{selected.size | safe}}, size={{selected.size | safe}}, prob={{selected.prob | safe}}))
                        rownames(.Table) <- (0:{{selected.size | safe}})
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Binomial Probabilities")
                    }
                    )                
                `
        }
        var objects = {
            size: {
                el: new input(config, {
                    no: 'size',
                    label: binomialProbabilities.t('size'),
                    required: true,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: binomialProbabilities.t('prob'),
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
                name: binomialProbabilities.t('navigation'),
                icon: "icon-binary-code-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: binomialProbabilities.t('help.title'),
            r_help: binomialProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: binomialProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new binomialProbabilities().render()
}
