





class poissonTailProbabilities extends baseModal {
    static dialogId = 'poissonTailProbabilities'
    static t = baseModal.makeT(poissonTailProbabilities.dialogId)

    constructor() {
        var config = {
            id: poissonTailProbabilities.dialogId,
            label: poissonTailProbabilities.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::ppois(c({{selected.varvals | safe}}), lambda={{selected.lambda | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: poissonTailProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: poissonTailProbabilities.t('lambda'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: poissonTailProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: poissonTailProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: poissonTailProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.lambda.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: poissonTailProbabilities.t('navigation'),
                icon: "icon-fish-t",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: poissonTailProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: poissonTailProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new poissonTailProbabilities().render()
}
