export default class BaseBuilder<T extends Object> {
    protected entity: T;
    Build(): T {
        return this.entity;
    }
}