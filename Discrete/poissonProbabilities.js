





class poissonProbabilities extends baseModal {
    static dialogId = 'poissonProbabilities'
    static t = baseModal.makeT(poissonProbabilities.dialogId)

    constructor() {
        var config = {
            id: poissonProbabilities.dialogId,
            label: poissonProbabilities.t('title'),
            modalType: "one",
            RCode: `
                local(
                    {
                       .Table <- data.frame(Probability=stats::dpois(0:6, lambda={{selected.lambda | safe}}))
                        rownames(.Table) <- (0:6)
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Poisson Probabilities")
                    }
                    )                
                `
        }
        var objects = {
            lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: poissonProbabilities.t('lambda'),
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
            items: [objects.lambda.el.content],
            nav: {
                name: poissonProbabilities.t('navigation'),
                icon: "icon-fish-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: poissonProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: poissonProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new poissonProbabilities().render()
}
