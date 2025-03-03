/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class negativeBinomialQuantiles extends baseModal {
    static dialogId = 'negativeBinomialQuantiles'
    static t = baseModal.makeT(negativeBinomialQuantiles.dialogId)

    constructor() {
        var config = {
            id: negativeBinomialQuantiles.dialogId,
            label: negativeBinomialQuantiles.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::qnbinom(c({{selected.varvals | safe}}), size={{selected.size | safe}}, prob={{selected.prob | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: negativeBinomialQuantiles.t('varvals'),
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
                    label: negativeBinomialQuantiles.t('size'),
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
                    label: negativeBinomialQuantiles.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            labelSig: { el: new labelVar(config, { label: negativeBinomialQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: negativeBinomialQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: negativeBinomialQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.size.el.content, objects.prob.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: negativeBinomialQuantiles.t('navigation'),
                icon: "icon-negtive-binary-code-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: negativeBinomialQuantiles.t('help.title'),
            r_help: negativeBinomialQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: negativeBinomialQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new negativeBinomialQuantiles().render()
}
