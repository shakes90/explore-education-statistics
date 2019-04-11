import React, {cloneElement, Component, createRef, ReactNode} from 'react';
import isComponentType from '../lib/type-guards/components/isComponentType';
import AccordionSection, {AccordionSectionProps} from './AccordionSection';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import EditableAccordionSection, {EditableAccordionSectionProps} from "./EditableAccordionSection";

export interface EditableAccordionProps {
    children: ReactNode;
    id: string;
    index: number
}

interface State {
    hash: string;
}

class EditableAccordion extends Component<EditableAccordionProps, State> {
    public state = {
        hash: '',
    };

    private ref = createRef<HTMLDivElement>();

    private accordion: any;

    public componentDidMount(): void {
        import('govuk-frontend/components/accordion/accordion').then(
            ({default: GovUkAccordion}) => {
                if (this.ref.current) {
                    this.accordion = new GovUkAccordion(this.ref.current);
                    this.accordion.init();
                }
            },
        );

        this.goToHash();
        window.addEventListener('hashchange', this.goToHash);
    }

    public componentDidUpdate() {
        import('govuk-frontend/components/accordion/accordion').then(
            ({default: GovUkAccordion}) => {
                if (this.ref.current) {
                    //this.accordion.initSectionHeaders();
                    //new GovUkAccordion(this.ref.current).init();
                }
            }
        );
    }

    public componentWillUnmount(): void {
        window.removeEventListener('hashchange', this.goToHash);
    }

    private goToHash = () => {
        this.setState({hash: location.hash});

        if (this.ref.current && location.hash) {
            const anchor = this.ref.current.querySelector(
                location.hash,
            ) as HTMLButtonElement;

            if (anchor) {
                anchor.scrollIntoView();
            }
        }
    };

    public onDragEnd() {

    }

    public render() {
        const {children, id, index} = this.props;
        const {hash} = this.state;

        let sectionId = 0;

        return (

            <div className="govuk-accordion" ref={this.ref} id={id}>

                {React.Children.map(children, (child, thisIndex) => {
                    if (isComponentType(child, EditableAccordionSection)) {
                        return cloneElement<EditableAccordionSectionProps>(child, {
                            index: thisIndex,
                            droppableIndex: index
                        });
                    }

                    return child;
                })}


            </div>

        );
    }
}

export default EditableAccordion;
