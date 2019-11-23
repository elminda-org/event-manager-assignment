import EventManager from '../src/eventManager'

describe("EventManager",()=>{

    it("Inititate EM",()=>{
       let em = new EventManager();
        expect(em).not.toBeNull();
    });
   
    it("Simple register and fire", () => {
        const mockCallback = jest.fn( () => {});
        let em = new EventManager();
        em.registerEvent("e1", mockCallback);
        return  em.fire('e1')
        .then(()=>{
            expect(mockCallback.mock.calls.length).toBe(1);
        });
    });

    it("Register multiple events", () => {
        const mockCallback = jest.fn( () => {});
        let em = new EventManager();
        em.registerEvent("e1", mockCallback);
        em.registerEvent("e2", mockCallback);
        return  em.fire('e1')
        .then(()=>{
            expect(mockCallback.mock.calls.length).toBe(1);
            return em.fire("e2");
        })
        .then(()=>{
            expect(mockCallback.mock.calls.length).toBe(2);
        });
    });

    it("Test multiple cb on one event with fail cb", () => {
        const mockCallback1 = jest.fn( () => {});
        const mockCallback2 = jest.fn( () => {throw "error";});
        const mockCallback3 = jest.fn( () => {});
        let em = new EventManager();
        em.registerEvent("e1", mockCallback1);
        em.registerEvent("e1", mockCallback2);
        em.registerEvent("e1", mockCallback3);
        return  em.fire('e1')
        .then(()=>{
            expect(mockCallback1.mock.calls.length).toBe(1);
            expect(mockCallback2.mock.calls.length).toBe(1);
            expect(mockCallback3.mock.calls.length).toBe(1);
            expect(mockCallback2.mock.results[0].type).toBe("throw")
        });
    });

    it("Delete registration",()=>{

    });

})