





class exponentialProbabilities extends baseModal {
    static dialogId = 'exponentialProbabilities'
    static t = baseModal.makeT(exponentialProbabilities.dialogId)

    constructor() {
        var config = {
            id: exponentialProbabilities.dialogId,
            label: exponentialProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pexp(c({{selected.varvals | safe}}), rate={{selected.rate | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: exponentialProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            rate: {
                el: new input(config, {
                    no: 'rate',
                    label: exponentialProbabilities.t('rate'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: exponentialProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: exponentialProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: exponentialProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.rate.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: exponentialProbabilities.t('navigation'),
                icon: "icon-letter-e-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: exponentialProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: exponentialProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new exponentialProbabilities().render()
}
