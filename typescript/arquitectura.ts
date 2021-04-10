
interface UserEntity {
    name: string;
    lastname: string;
    cmp: string;
    email: string;
    password: string;
}

interface DriverEntity {
    name: string;
    lastname: string;
}

interface MedicEntity {
    name: string;
    lastname: string;
}

interface HistoryEntity {
    numHistory: number;
    namePatient: string;
    medic: MedicEntity;
    driver: DriverEntity;
    user: UserEntity;
}

// Aplicacion
interface UserResponseDto {
    name: string;
    lastname: string;
    cmp: string;
}
const mappingUserDto = (user: UserEntity): UserResponseDto => ({
    name: user.name,
    lastname: user.lastname,
    cmp: user.cmp,
});

interface Result<T> {
    trace: string;
    payload: {
        data: T;
    };
}

interface RepositoryBase<T> {
    insert(user: T): Result<T>;
    update(user: T): Result<T>;
    list(): Result<T[]>;
    remove(user: T): Result<T>;
}

interface UserRepository extends RepositoryBase<UserEntity> {
    userExists(user: UserEntity): UserEntity;
}

class UserUseCase {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    insert(user: UserEntity): Result<UserEntity> {
        const result: Result<UserEntity> = this.userRepository.insert(user);
        return result;
    }

    userExists(user: UserEntity): UserEntity {
        return this.userRepository.userExists(user);
    }
}

// Infraestructura
class UserOperation implements UserRepository {
    insert(user: UserEntity): Result<UserEntity> {
        const trace: string = this.getTrace();
        const data: UserEntity = this.process(user);
        return { trace, payload: { data } };
    }

    update(user: UserEntity): Result<UserEntity> {
        const trace: string = this.getTrace();
        const data: UserEntity = this.process(user);
        return { trace, payload: { data } };
    }

    list(): Result<UserEntity[]> {
        const trace: string = this.getTrace();
        const data: UserEntity[] = [];
        return { trace, payload: { data } };
    }

    remove(user: UserEntity): Result<UserEntity> {
        const trace: string = this.getTrace();
        const data: UserEntity = this.process(user);
        return { trace, payload: { data } };
    }

    userExists(user: UserEntity): UserEntity {
        return user;
    }

    process(user: UserEntity): UserEntity {
        return user;
    }

    getTrace(): string {
        return 'abc234557.ghc';
    }
}


const user: UserEntity = {
    name: 'Sergio',
    lastname: 'Hidalgo',
    email: 'sergio@correo.com',
    cmp: '03456',
    password: '12345',
};

const userOperation: UserRepository = new UserOperation()
const userUseCase: UserUseCase = new UserUseCase(userOperation)
console.log(userUseCase.insert(user))


