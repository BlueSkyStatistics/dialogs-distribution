





class hypergeometricProbabilities extends baseModal {
    static dialogId = 'hypergeometricProbabilities'
    static t = baseModal.makeT(hypergeometricProbabilities.dialogId)

    constructor() {
        var config = {
            id: hypergeometricProbabilities.dialogId,
            label: hypergeometricProbabilities.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        .Table <- data.frame(Probability=stats::dhyper(1:2, m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}}))
                          rownames(.Table) <- (1:2)
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Hypergeometric Probabilities")
                        }
                        )                    
                `
        }
        var objects = {
            m: {
                el: new input(config, {
                    no: 'm',
                    label: hypergeometricProbabilities.t('m'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            n: {
                el: new input(config, {
                    no: 'n',
                    label: hypergeometricProbabilities.t('n'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            k: {
                el: new input(config, {
                    no: 'k',
                    label: hypergeometricProbabilities.t('k'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            }
        }
        const content = {
            items: [objects.m.el.content, objects.n.el.content, objects.k.el.content],
            nav: {
                name: hypergeometricProbabilities.t('navigation'),
                icon: "icon-curve-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: hypergeometricProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: hypergeometricProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new hypergeometricProbabilities().render()
}
