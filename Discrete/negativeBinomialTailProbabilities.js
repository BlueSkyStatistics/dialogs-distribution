





class negativeBinomialTailProbabilities extends baseModal {
    static dialogId = 'negativeBinomialTailProbabilities'
    static t = baseModal.makeT(negativeBinomialTailProbabilities.dialogId)

    constructor() {
        var config = {
            id: negativeBinomialTailProbabilities.dialogId,
            label: negativeBinomialTailProbabilities.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::pnbinom(c({{selected.varvals | safe}}), size={{selected.size | safe}}, prob={{selected.prob | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: negativeBinomialTailProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            size: {
                el: new input(config, {
                    no: 'size',
                    label: negativeBinomialTailProbabilities.t('size'),
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
                    label: negativeBinomialTailProbabilities.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            labelSig: { el: new labelVar(config, { label: negativeBinomialTailProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: negativeBinomialTailProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: negativeBinomialTailProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.size.el.content, objects.prob.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: negativeBinomialTailProbabilities.t('navigation'),
                icon: "icon-negtive-binary-code-t",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: negativeBinomialTailProbabilities.t('help.title'),
            r_help: negativeBinomialTailProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: negativeBinomialTailProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new negativeBinomialTailProbabilities().render()
}
