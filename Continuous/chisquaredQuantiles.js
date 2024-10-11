





class chisquaredQuantiles extends baseModal {
    static dialogId = 'chisquaredQuantiles'
    static t = baseModal.makeT(chisquaredQuantiles.dialogId)

    constructor() {
        var config = {
            id: chisquaredQuantiles.dialogId,
            label: chisquaredQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qchisq(c({{selected.prob | safe}}), df={{selected.degoffree | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: chisquaredQuantiles.t('prob'),
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
                    label: chisquaredQuantiles.t('degoffree'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            labelSig: { el: new labelVar(config, { label: chisquaredQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: chisquaredQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: chisquaredQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.degoffree.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: chisquaredQuantiles.t('navigation'),
                icon: "icon-chi_squared-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: chisquaredQuantiles.t('help.title'),
            r_help: "help(data,package='utils')",
            body: chisquaredQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new chisquaredQuantiles().render()
}
