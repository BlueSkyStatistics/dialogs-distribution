





class chisquaredProbabilities extends baseModal {
    static dialogId = 'chisquaredProbabilities'
    static t = baseModal.makeT(chisquaredProbabilities.dialogId)

    constructor() {
        var config = {
            id: chisquaredProbabilities.dialogId,
            label: chisquaredProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pchisq(c({{selected.varvals | safe}}), df={{selected.degoffree | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: chisquaredProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            degoffree: {
                el: new input(config, {
                    no: 'degoffree',
                    label: chisquaredProbabilities.t('degoffree'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            labelSig: { el: new labelVar(config, { label: chisquaredProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: chisquaredProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: chisquaredProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.degoffree.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: chisquaredProbabilities.t('navigation'),
                icon: "icon-chi_squared-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: chisquaredProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: chisquaredProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new chisquaredProbabilities().render()
}
