





class tProbabilities extends baseModal {
    static dialogId = 'tProbabilities'
    static t = baseModal.makeT(tProbabilities.dialogId)

    constructor() {
        var config = {
            id: tProbabilities.dialogId,
            label: tProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pt(c({{selected.varvals | safe}}), df={{selected.degoffree | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: tProbabilities.t('varvals'),
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
                    label: tProbabilities.t('degoffree'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            labelSig: { el: new labelVar(config, { label: tProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: tProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: tProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.degoffree.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: tProbabilities.t('navigation'),
                icon: "icon-tumblr-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: tProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: tProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new tProbabilities().render()
}
